import { GetStaticProps, GetStaticPaths } from 'next'
import { default as PrismicJS } from 'prismic-javascript'
import { DefaultClient } from 'prismic-javascript/types/client'
import { Document } from 'prismic-javascript/types/documents'
import { QueryOptions } from 'prismic-javascript/types/ResolvedApi'
import { ParsedUrlQuery } from 'querystring'

interface Options {
  type: string
  param: string
  rootUid?: string
  fallback?: boolean
}

type Props = { [x: string]: any }
type Path = (string | { params: ParsedUrlQuery })


export class PrismicNextRest {
  client: DefaultClient
  propQueue: any[]
  pathQueue: any[]
  private fallback: boolean

  constructor(client: DefaultClient) {
    this.client = client
    this.propQueue = []
    this.pathQueue = []
    this.fallback = false
  }

  getSingle(type: string, clientOptions = {}, propName?: string): this {
    const props: GetStaticProps = async () => {
      const page = await this.client.getSingle(type, clientOptions)
      const { data } = page

      return {
        props: {
          [propName || type]: data,
        },
      }
    }

    this.propQueue.push(props)

    return this
  }

  getRepeatable(options: Options, clientOptions?: QueryOptions, propName?: string): this {
    const {
      type,
      param,
      rootUid = '',
      fallback = false,
    } = options

    this.fallback = fallback

    const paths: GetStaticPaths = this.getPaths(options)

    const props: GetStaticProps = async ({
      params,
      preview = false,
      previewData,
    }) => {
      const options = clientOptions || {}
      const uid = params && params[param]
      const document = await this.client.getByUID(
        type,
        uid ? uid[uid.length - 1] : rootUid,
        { ...options, ...previewData },
      )

      const { data } = document

      return {
        props: {
          [propName || type]: data,
          preview,
        },
      }
    }

    this.propQueue.push(props)
    this.pathQueue.push(paths)

    return this
  }

  /*
   * This callback will get added to the props queue
   * It must return an object with a props key
   */
  getStaticProps(callback: GetStaticProps): this {
    this.propQueue.push(callback)
    return this
  }

  /**
   * Prismic.getPaths
   * This method can be used standalone, but it adds items to this.pathQueue in
   * Prismic.getRepeatable() to build a list of paths based on UID, callable from
   * Prismic.paths
   *
   * Only use this if you're building a path list based on some other query,.
   */
  getPaths({
    type,
    param,
    rootUid = '',
    fallback = false,
  }: Options,
  clientOptions = {}): GetStaticPaths {
    return async () => {
      const response = await this.client.query(
        PrismicJS.Predicates.at('document.type', type),
        clientOptions,
      )

      const { results } = response

      const paths = filterPaths(
        results.map(byUID(param)),
        [rootUid],
        param,
      )

      if (rootUid) {
        // Add empty item to paths to handle root url
        paths.unshift({ params: { [param]: [] } })
      }

      return {
        paths,
        fallback,
      }
    }
  }

  get staticProps(): GetStaticProps {
    return async (p) => {
      const reducer = propsReducer(p)
      const props = await this.propQueue.reduce(reducer, {})
      return { props }
    }
  }

  get staticPaths(): GetStaticPaths {
    return async () => {
      const paths = await this.pathQueue.reduce(pathsReducer, [])
      return { paths, fallback: this.fallback }
    }
  }
}

const propsReducer = (p: Props) => async (acc: Promise<Props>, current: GetStaticProps): Promise<Props> => {
  const allProps = await acc
  const { props } = await current(p)
  return { ...allProps, ...props }
}

type PathAcc = Promise<Path[]>
const pathsReducer = async (acc: PathAcc, current: GetStaticPaths): Promise<Path[]> => {
  const allPaths = await acc
  const { paths } = await current()
  return [...allPaths, ...paths]
}

function byUID(param: string) {
  return (result: Document): Path => {
    const route = result.data.route !== null
      ? [...result.data.route.split('/'), result.uid]
      : [result.uid]

    return ({ params: { [param]: route } })
  }
}

function filterPaths(paths: Path[], uids: string[], param: string): Path[] {
  return paths.filter((path) => {
    if (typeof path !== 'string') {
      const params = path.params[param] as string[]

      if (params && uids.includes(params.join('/'))) {
        return false
      }
      return path
    }

    return path
  })
}
