import React from "react";

interface Props {
  params: { id: string };
}

function Page({ params }: Props) {
  console.log(Object.keys(params));

  return <div>BBlog {params.id}</div>;
}

export default Page;
