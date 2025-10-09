import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  return (
    <div className="font-inter text-white">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-80"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-black via-[#1a001f] to-[#3d0075] p-8 text-center shadow-[0_0_20px_#8a2be2]">
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-white drop-shadow-[0_0_12px_#8a2be2]">
              Start Your Career
            </h1>
            <p className="text-xl text-gray-300">
              Find your perfect career path with intelligent matching
            </p>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-black via-[#2a003f] to-[#5a00a3] p-8 text-center shadow-[0_0_20px_#8a2be2]">
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-white drop-shadow-[0_0_12px_#8a2be2]">
              Personalized Recommendations
            </h1>
            <p className="text-xl text-gray-300">
              Get job suggestions tailored to your skills and interests
            </p>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-black via-[#1a002d] to-[#4b0082] p-8 text-center shadow-[0_0_20px_#8a2be2]">
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-white drop-shadow-[0_0_12px_#8a2be2]">
              Fast and Intelligent Matching
            </h1>
            <p className="text-xl text-gray-300">
              Let AI quickly connect you with the right opportunities
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
