import './page_vdo.css'
import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import Image from "next/image";

export default async function Home() {

  const session = await getServerSession(options);
  const user = session?.user || null;

  return <>
    <h1>
    <div className="video_animation">
      <video
        className="vid"
          id="vid"
          preload="false"
          muted
          playsInline
          loop
          autoPlay
          src="/assets/animation.webm"
        ></video>
      </div>
    </h1>
  </>

}

export const metadata = {
  title: "CSE Bootcamp 2.0 - Home",
  description: "A palce to clill",
};

// {"name":"Brijendra Singh","email":"b122041@iiit-bh.ac.in","image":"https://lh3.googleusercontent.com/a/AAcHTteV-zE6NIOj8A5zk2Wo_aglZgQzO5m5qLr_n9-O6smA=s96-c"}