import Document, {
  type DocumentContext,
  type DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
// import { getCspContent } from "utils";

class MyDocument extends Document {
  static override async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  override render() {
    // const csp = getCspContent(NextScript.getInlineScriptSource(this.props));

    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          {/* <meta httpEquiv="Content-Security-Policy" content={csp} /> */}

          <meta name="Developer DAO Academy" content="Developer DAO Academy" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Developer DAO Academy" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body className="var(--academy-bg-dark)">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
