import { notFound, redirect } from "next/navigation";


export default function ResolveToProjectId({ params }: { params: { project: string }}) {
  console.log("bad url")
  return notFound()
}