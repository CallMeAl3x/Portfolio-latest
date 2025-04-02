interface RingProps {
  top?: number;
  left?: number;
}

export default function Ring({ left, top }: RingProps) {
  return (
    <img
      src="/img/about/ring.svg"
      alt="ring"
      draggable="false"
      className="ringImage absolute z-10 h-[914px] w-[845px]"
      style={{
        top: `${top}px`,
        left: `${left}px`
      }}
    />
  );
}
