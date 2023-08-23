import Retry from "@/components/Retry";
import Form from "@/components/form/form";
import ImageUpload from "@/components/profileImage/ImageUpload";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile - CSE Bootcamp 2.0",
  description: "",
};

export default async function Page({ searchParams: user }) {

  if (!user.email) {
    redirect("/api/auth/signin");
  }

  const year = user.email[3];

  if(year !== '2' && year !== '3') {
    redirect("/");
  }

  const id = user.email.split("@")[0];
  let data = {
    name: '',
    about: '',
    state: '',
    city: '',
    instagram: '',
    github: '',
    linkedin: '',
    image: '',
    id: id,
    year: Number.parseInt(id.at(3))
  };

  try {
    const response = await fetch(`${process.env.HOST}/api/db?id=${id}`, { cache: 'no-store' });
    data = await response.json() || data;

  } catch (err) {
    return <div className=" mt-52"><h1>Err: {err.message}</h1><Retry>Retry</Retry></div>
  }

  return (
    <div className="profile-container relative top-10">
      <ImageUpload name={id} src={data.image} host={process.env.HOST} />
      <Form prevData={data} user={id} host={process.env.HOST} />
    </div>
  );
}