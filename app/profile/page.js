import { options } from "@/app/api/auth/[...nextauth]/options";
import Retry from "@/components/Retry";
import Form from "@/components/form/form";
import ImageUpload from "@/components/profileImage/ImageUpload";
import Post from "@/models/Post";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile - CSE Bootcamp 2.0"
};

export default async function Page() {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const id = session.user.email.split('@')[0];
  const year = id[3];

  if (year !== '2' && year !== '3') {
    redirect('/');
  }

  const dataDefaults = {
    name: '',
    about: '',
    state: '',
    city: '',
    instagram: '',
    github: '',
    linkedin: '',
    image: '',
    id: id,
    year: Number.parseInt(year)
  };

  try {
    const response = await fetch(`${process.env.HOST}/api/db?id=${id}`);
    const fetchedData = await response.json();

    if (fetchedData) {
      Object.assign(dataDefaults, fetchedData);
    }
  } catch (err) {
    return (
      <div className=" mt-52">
        <h1>Err: {err.message}</h1>
        <Retry />
      </div>
    );
  }

  return (
    <div className="profile-container relative">
      <ImageUpload name={id} src={dataDefaults.image} host={process.env.HOST} />
      <Form prevData={dataDefaults} user={id} host={process.env.HOST} />
    </div>
  );
}