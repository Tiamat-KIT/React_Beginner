import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { getDetail, getList } from "../../util/microcms";

export async function generateStaticParams() {
    const { contents } = await getList();

    const paths = contents.map((post) => {
        return {
            postId: post.id,
        };
    });

    return [...paths];
}

export default async function StaticDetailPage({
    params: { postId },
}: {
    params: { postId: string };
}) {
    const post = await getDetail(postId);

 // ページの生成された時間を取得
    const time = new Date().toLocaleString();

    if (!post) {
    notFound();
    }

    return (
        <article className="prose container mx-auto">
            <h1 className="text-3xl">{post.title}</h1>
            <h2 className="text-blue-400">{time}</h2>
            <div>{parse(post.content)}</div>
        </article>
    );
}