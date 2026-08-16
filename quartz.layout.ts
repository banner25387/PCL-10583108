import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    // 名前順（デフォルト）を明示的な仕様として採用：タイトル先頭の【シリーズ名】が
    // 自然にシリーズ索引になるため（2026-08-16 沛拍板）。
    // 以前ここにあった日付ソートは存在しないプロパティを参照しており一度も機能していなかった。
    Component.Explorer(),
    Component.DesktopOnly(Component.RecentNotes({ title: "📁 Tags", limit: 0, linkToMore: "tags" })),
  ],
  right: [
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug === "index",
      component: Component.RecentNotes({
        title: "New",
        limit: 1,
        showTags: true,
        filter: (f) => (f.filePath ? !f.filePath.endsWith("index.md") : true),
      }),
    }),
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug === "index",
      component: Component.PostCalendar({ title: "Calendar" }),
    }),
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
