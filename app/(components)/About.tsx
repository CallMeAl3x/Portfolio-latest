export default function About() {
  const frontend = [
    {
      name: "Tailwind",
      img: "/img/about/tailwind.svg"
    },
    {
      name: "AngularJS",
      img: "/img/about/angular.svg"
    },
    {
      name: "NextJS",
      img: "/img/about/nextjs.svg"
    },
    {
      name: "VueJS",
      img: "/img/about/vuejs.svg"
    },
    {
      name: "Sass",
      img: "/img/about/sass.svg"
    },
    {
      name: "Shadcn",
      img: "/img/about/shadcn.svg"
    },
    {
      name: "Expo",
      img: "/img/about/expo.svg"
    }
  ];

  const backend = [
    {
      name: "NextJS",
      img: "/img/about/nextjs.svg"
    },
    {
      name: "PhP",
      img: "/img/about/php.svg"
    },
    {
      name: "Prisma",
      img: "/img/about/prisma.svg"
    },
    {
      name: "Wordpress",
      img: "/img/about/wordpress.svg"
    },
    {
      name: "Zustand",
      img: "/img/about/zustand.png"
    },
    {
      name: "Pinia",
      img: "/img/about/pinia.svg"
    },
    {
      name: "AWS",
      img: "/img/about/aws.svg"
    }
  ];

  const design = [
    {
      name: "Figma",
      img: "/img/about/figma.svg"
    },
    {
      name: "Photoshop",
      img: "/img/about/photoshop.svg"
    },
    {
      name: "After Effect",
      img: "/img/about/aftereffect.svg"
    },
    {
      name: "Illustrator",
      img: "/img/about/illustrator.svg"
    }
  ];

  const others = [
    {
      name: "Git",
      img: "/img/about/git.svg"
    },
    {
      name: "ChatGPT",
      img: "/img/about/chatgpt.svg"
    },
    {
      name: "Microsoft Azure",
      img: "/img/about/microsoft_azure.svg"
    },
    {
      name: "Gitlab",
      img: "/img/about/gitlab.svg"
    }
  ];

  return (
    <div className="ml-auto mr-auto mt-80 grid h-[90vh] max-h-[805px] max-w-[1250px] grid-cols-5 grid-rows-5 gap-3.5 px-[4.5vw] 2xl:max-w-[65vw]">
      <div className="col-span-3 row-span-3 rounded-2xl bg-blue-200 p-6">
        <p className="mt-1 text-center text-3xl text-black">Front</p>
        <div className="mt-6 grid grid-cols-3 gap-5 gap-x-6">
          {frontend.map((item) => (
            <div key={item.name} className="ml-auto mr-auto flex h-auto w-fit flex-col items-center gap-2">
              <img
                src={item.img}
                alt={item.name}
                className="h-12 w-12 overflow-hidden rounded-lg transition-all duration-150 hover:scale-150"
              />
              <p className="text-lg text-black">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 col-start-4 row-span-2 rounded-2xl bg-slate-200 p-6">
        <p className="mt-1 text-center text-3xl text-black">Design</p>
        <div className="mt-8 grid grid-cols-3 gap-8 gap-x-6">
          {design.map((item) => (
            <div key={item.name} className="ml-auto mr-auto flex h-auto w-fit flex-col items-center gap-2">
              <img
                src={item.img}
                alt={item.name}
                className="h-12 w-12 overflow-hidden rounded-lg transition-all duration-150 hover:scale-150"
              />
              <p className="text-lg text-black">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-3 col-start-1 row-span-2 row-start-4 rounded-2xl bg-zinc-600 p-6">
        <p className="mt-1 text-center text-3xl text-white">Others</p>
        <div className="mt-6 grid grid-cols-3 gap-5 gap-x-6">
          {others.map((item) => (
            <div key={item.name} className="ml-auto mr-auto flex h-auto w-fit flex-col items-center gap-2">
              <img
                src={item.img}
                alt={item.name}
                className="h-12 w-12 overflow-hidden rounded-lg transition-all duration-150 hover:scale-150"
              />
              <p className="text-lg text-black">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 col-start-4 row-span-3 row-start-3 rounded-2xl bg-neutral-600 p-6">
        <p className="mt-1 text-center text-3xl text-white">Backend</p>
        <div className="mt-6 grid grid-cols-3 gap-12 gap-x-6">
          {backend.map((item) => (
            <div key={item.name} className="ml-auto mr-auto flex h-auto w-fit flex-col items-center gap-2">
              <img
                src={item.img}
                alt={item.name}
                className="h-12 w-12 overflow-hidden rounded-lg transition-all duration-150 hover:scale-150"
              />
              <p className="text-lg text-black">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
