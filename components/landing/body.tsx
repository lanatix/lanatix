import Image from "next/image";
import tickets from "../../assets/images/tickets.png";
import Link from "next/link";

export default function Body() {
  return (
    <div className="flex flex-col mt-10 md:mt-5 items-center justify-center">
      <div className="text-center z-20 md:text-5xl text-4xl font-bold leading-normal">
        <h4>Welcome to Lanatix</h4>
        <h4>Your Next-Gen Ticket Booking Platform!</h4>
      </div>
      <h4 className="font-light mt-5 text-neutral-400">powered by Solana</h4>
      <div
        className="flex z-20 mt-16 gap-10
       items-center"
      >
        <Link href="/auth">
          <button className="btn-gradient2 text-black text-xl rounded-full py-2.5 px-5 font-medium ml-auto">
            Get Started
          </button>
        </Link>
        {/* <button className="flex font-medium gap-2.5 items-center">
          <PlaySVG /> How it works
        </button> */}
      </div>
      <div className="h-[600px]">
        <Image src={tickets} alt="tickets" className="h-full object-cover" />
      </div>
      <div className="hero-gradient absolute -z-10"></div>
    </div>
  );
}

const PlaySVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
  >
    <path
      d="M15 0C12.0333 0 9.13319 0.879735 6.66645 2.52796C4.19971 4.17618 2.27713 6.51886 1.14181 9.25975C0.00649925 12.0006 -0.290551 15.0166 0.288227 17.9263C0.867006 20.8361 2.29562 23.5088 4.3934 25.6066C6.49119 27.7044 9.16394 29.133 12.0736 29.7118C14.9834 30.2905 17.9994 29.9935 20.7403 28.8582C23.4811 27.7229 25.8238 25.8003 27.472 23.3335C29.1203 20.8668 30 17.9667 30 15C30 11.0217 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9783 0 15 0ZM22.9789 15.9589L10.1218 22.3875C9.9584 22.4691 9.77685 22.5077 9.59439 22.4994C9.41192 22.4911 9.2346 22.4364 9.07926 22.3403C8.92392 22.2442 8.79572 22.11 8.70684 21.9504C8.61796 21.7909 8.57135 21.6112 8.57143 21.4286V8.57143C8.57153 8.38886 8.61828 8.20935 8.70723 8.04993C8.79619 7.89051 8.9244 7.75646 9.07971 7.6605C9.23502 7.56455 9.41228 7.50987 9.59466 7.50166C9.77703 7.49344 9.95848 7.53196 10.1218 7.61357L22.9789 14.0421C23.1567 14.1312 23.3061 14.268 23.4105 14.4371C23.515 14.6063 23.5703 14.8012 23.5703 15C23.5703 15.1988 23.515 15.3937 23.4105 15.5628C23.3061 15.732 23.1567 15.8688 22.9789 15.9579V15.9589Z"
      fill="url(#paint0_linear_3_36)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3_36"
        x1="-21.6"
        y1="15"
        x2="50.1219"
        y2="-27.3603"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.15625" stopColor="#00FFA3" stopOpacity="0.62" />
        <stop offset="0.364583" stopColor="#DC1FFF" stopOpacity="0.83" />
        <stop offset="0.666667" stopColor="#03E1FF" stopOpacity="0.82" />
        <stop offset="0.875" stopColor="#DC1FFF" stopOpacity="0.48" />
      </linearGradient>
    </defs>
  </svg>
);
