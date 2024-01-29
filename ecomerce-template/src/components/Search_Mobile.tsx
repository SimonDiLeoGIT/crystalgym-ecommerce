interface propsType {
  setSearchMode(state: boolean): void,
  search_icon: string,
  close_icon: string,
}

export const Search_Mobile: React.FC<propsType> = ({ setSearchMode, search_icon, close_icon }) => {


  return (
    <section className="fixed w-screen h-screen top-0 left-0 bg-white">
      <section className="w-full grid grid-cols-5 p-2 border-b-2">
        <form className="border-2 rounded-full col-span-4 grid grid-cols-5 gap-2 p-2">
          <input type="text" placeholder="Search for a Product..."
            className="rounded-full col-span-4 px-2"
          />
          <button
            className="m-auto p-2 rounded-full bg-slate-100"
            onClick={() => setSearchMode(false)}
          >
            <img src={search_icon} className="w-5" />
          </button>
        </form>
        <button
          className="ml-auto"
          onClick={() => setSearchMode(false)}
        >
          <img src={close_icon} className="" />
        </button>
      </section>
    </section>
  )
}