import * as React from 'react'
import '../styles/prism-ghcolors.css'
import { MarkdownRemark, RelayConnection } from '../types'
import App from '../components/App'
import Sidebar from '../components/Tutorials/Sidebar'
import Chapter from '../components/Tutorials/Chapter'
import Success from '../components/Success/Success'
import { extractSteps } from '../utils/graphql'

interface Props {
  data: {
    markdownRemark: MarkdownRemark
    mds: RelayConnection<MarkdownRemark>
  }
  location: any
  history: any
}

class Tutorials extends React.Component<Props, null> {
  private ref: any

  componentDidUpdate(oldProps: Props) {
    if (oldProps.location.key !== this.props.location.key) {
      this.scrollUp()
    }
  }

  public render() {
    const post = this.props.data.markdownRemark

    const showSuccess = this.props.location.pathname.includes('/success')
    const steps = extractSteps(this.props.data.mds)

    return (
      <App
        history={this.props.history}
        steps={steps}
        location={this.props.location}
      >
        <div className="tutorials">
          <style jsx={true}>{`
            .tutorials {
              @p: .flex;
            }
            .left-container {
              @p: .bbox, .flexAuto;
              height: calc(100vh - 68px);
              overflow-y: scroll; /* has to be scroll, not auto */
              -webkit-overflow-scrolling: touch;
            }
          `}</style>
          <div
            className="left-container"
            id="tutorials-left-container"
            ref={this.setRef}
          >
            {showSuccess
              ? <Success post={post} steps={steps} />
              : <Chapter
                  post={post}
                  location={this.props.location}
                  steps={steps}
                />}
          </div>
          <Sidebar steps={steps} post={post} location={this.props.location} />
        </div>
      </App>
    )
  }

  private setRef = ref => {
    this.ref = ref
  }

  private scrollUp = () => {
    // TODO scroll up and not down
    // scrolling down just for development
    if (this.ref) {
      this.ref.scrollTop = 0
    }
  }
}

export default Tutorials

export const pageQuery = graphql`
  query ChapterBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      fields {
        slug
      }
      excerpt(pruneLength: 140)
      frontmatter {
        title
        videoId
        videoAuthor
        parent
        question
        answers
        correctAnswer
        description
        pageTitle
      }
    }
    mds: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
