import { Orders } from "../components/Orders/Orders"

export const Profile = () => {
  return (
    <section className="p-2 -text--color-black lg:w-11/12 lg:m-auto xl:9/12">
      <article className="w-full">
        <h1 className="font-bold text-lg">
          Hello @username!
        </h1>
      </article>
      <section className="w-full">
        <h1 className="font-bold">
          Your Orders
        </h1>
        <Orders />
      </section>
    </section>
  )
}