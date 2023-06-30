import Link from "next/link";
import { getList } from "../util/microcms";

// キャッシュを利用しない
export const revalidate = 0;

export default async function StaticPage() {
 const { contents } = await getList();

 // ページの生成された時間を取得
 const time = new Date().toLocaleString();

 if (!contents || contents.length === 0) {
  return <h1>No contents</h1>;
 }

 return (
  <div>
   <h1>{time}</h1>
   <ul>
    {contents.map((post) => {
     return (
      <li key={post.id}>
       <Link href={`/${post.id}`}>{post.title}</Link>
      </li>
     );
    })}
   </ul>
  </div>
 );
}