import React from "react";

function Page({ params }: { params: { user: string } }) {
  return <div>Hello {params.user}</div>;
}

export default Page;
