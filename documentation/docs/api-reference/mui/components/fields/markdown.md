---
id: markdown
title: Markdown
swizzle: true
---

This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<MarkdownField>` in a show page.

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import {
    useDataGrid,
    List,
    // highlight-next-line
    MarkdownField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", type: "number" },
    { field: "title", headerName: "Title", minWidth: 100, flex: 1 },
    {
        field: "content",
        headerName: "Content",
        renderCell: function render({ row }) {
            // highlight-start
            return <MarkdownField value={row?.content} />;
            // highlight-end
        },
        minWidth: 100,
        flex: 2,
    },
];

const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>();

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};

interface IPost {
    id: number;
    title: string;
    content: string;
}
// visible-block-end

render(
    <RefineMuiDemo
        resources={[
            {
                name: "posts",
                list: PostsList,
            },
        ]}
    />,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/MarkdownField" value-description="Markdown data to render"/>

## Example

<CodeSandboxExample path="input-custom" />
