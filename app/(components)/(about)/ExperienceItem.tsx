interface ExperienceItemProps {
  date: string;
  title: string;
  job: string;
  place: string;
  description: string[];
  compagny: string;
  className?: string;
}

export default function ExperienceItem({
  date,
  title,
  job,
  compagny,
  place,
  description,
  className
}: ExperienceItemProps) {
  return (
    <div
      className={`experience-item z-20 flex w-full flex-row gap-2 rounded-3xl bg-[#7FC3EC] p-5 text-white ${className}`}
    >
      <div className="flex flex-row items-end">
        <div className="flex flex-col gap-3">
          <p>{date}</p>
          <div>
            <h3>{title}</h3>
            <p className="pb-1 font-poppins-light text-sm">
              {compagny} | {job} <br /> {place}
            </p>
          </div>
        </div>
        <ul className="ml-auto max-w-[50%] list-disc font-poppins-reg text-sm">
          {description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
