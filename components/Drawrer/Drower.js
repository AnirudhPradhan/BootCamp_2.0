"use client";

import { Drawer } from "vaul";
import "./drawer.css"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Compress from "compress.js";
// const compress = new Compress();

export function Drower({userlist}) {

    const [active, setActive] = useState({});
    let {image, id, name, city, state, about, instagram, linkedin, github, ext} = active;
    const [width, setWidth] = useState(0);
    const [List, setList] = useState([]);

    useEffect(() => {
        setWidth(window.innerWidth);
        function resize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", resize);
        setList(userlist.map((curr)=>{
            let {image, id, name, city, state, ext} = curr;
            if(ext) {
                image = URL.createObjectURL(Compress.convertBase64ToFile(image, ext))
            }
            
            return(
                <div className="student-card" onClick={()=>setActive({...curr, image: image})} key={id}>
                    <Image src={image || `https://csebootcamp2k22.tech/images/${id}.webp`} height={70} width={70} alt="" />
                    <div>
                        <h1 className="student-card-name">{name?.toUpperCase()}</h1>
                        <p>{city+', '+state}</p>
                    </div>
                    <span>ID #{id.substring(4, 7)}</span>
                </div>
            )
        }))

        return () => window.removeEventListener("resize", resize);
    }, [])

    return (
        (width > 620) ? (
            <div className="d-container">
                {userlist.map(({image, id, name, city, state, about, instagram, linkedin, github, ext})=>{
                    if(ext && window) {
                        image = URL.createObjectURL(Compress.convertBase64ToFile(image, ext))
                    }
                    return(
                        <div className="drower-card" key={id}>
                        <div className="mx-auto">
                            <Image className="drower-image no-select" src={image || `https://csebootcamp2k22.tech/images/${id}.webp`} height={200} width={400} alt="" />
                            <span className="drower-id no-select">ID: #{id?.substring(4, 7)}</span>
                            <h1 className="drower-name no-select">{name?.toUpperCase()}</h1>
                            <p className="drower-city no-select">{(city+', '+state).toUpperCase()}</p>
                            <div className="drower-about no-select">{about?.toUpperCase()}</div>
                            <div className="drower-logo-container">
                                {instagram && <Link target="_blank" href={instagram} ><Image src={'/logo/instagram-logo.png'} height={60} width={60} alt="instagram link"/></Link>}
                                {linkedin && <Link target="_blank" href={linkedin} ><Image className=" bg-transparent" src={'/logo/linkedin-logo.png'} height={60} width={60} alt="linked link"/></Link>}
                                {github && <Link target="_blank" href={github} ><Image src={'/logo/github-logo.png'} height={60} width={60} alt="github link"/></Link>}
                                {id && <Link target="_blank" href={`https://mail.google.com/mail/?view=cm&to=${id}@iiit-bh.ac.in`}><Image src={'/logo/mail-logo.png'} height={60} width={60} alt="gmail link"/></Link>}
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        ) : (
            <Drawer.Root className="no-hlt">

                <Drawer.Trigger className="trigger">
                    {List}
                </Drawer.Trigger>

                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="drower-container">
                    <div className="flex-1 drower-card">
                    <div className="mx-auto w-16 h-1 flex-shrink-0 rounded-full bg-zinc-300 mb-1.5" />
                        <div className="mx-auto">
                            <Image className="drower-image no-select" src={image || `https://csebootcamp2k22.tech/images/${id}.webp`} height={200} width={400} alt="" />
                            <span className="drower-id no-select">ID: #{id?.substring(4, 7)}</span>
                            <h1 className="drower-name no-select">{name?.toUpperCase()}</h1>
                            <p className="drower-city no-select">{(city+', '+state).toUpperCase()}</p>
                            <div className="drower-about no-select">{about?.toUpperCase()}</div>
                            <div className="drower-logo-container">
                                {instagram && <Link target="_blank" href={instagram} ><Image src={'/logo/instagram-logo.png'} height={80} width={80} alt="instagram link"/></Link>}
                                {linkedin && <Link target="_blank" href={linkedin} ><Image className=" bg-transparent" src={'/logo/linkedin-logo.png'} height={80} width={80} alt="linked link"/></Link>}
                                {github && <Link target="_blank" href={github} ><Image src={'/logo/github-logo.png'} height={80} width={80} alt="github link"/></Link>}
                                {id && <Link target="_blank" href={`https://mail.google.com/mail/?view=cm&to=${id}@iiit-bh.ac.in`}><Image src={'/logo/mail-logo.png'} height={80} width={80} alt="gmail link"/></Link>}
                            </div>
                        </div>
                    </div>
                </Drawer.Content>

            </Drawer.Root>
        )
    );
}




