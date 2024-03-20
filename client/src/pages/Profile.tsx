import { Orders } from "../components/Orders/Orders"

export const Profile = () => {
  return (
    <section className="p-2 -text--color-black">
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