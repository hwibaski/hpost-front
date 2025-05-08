import { MainContainer } from '@/components/ui/MainContainer';
import { Link } from 'react-router-dom';

export default function HomeMain(): React.ReactElement {
  return (
    <MainContainer>
      <div className="h-screen bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="mx-auto flex h-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex w-full flex-col items-center text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <div className="mb-3">Hpost</div>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                비즈니스 성장을 위한 최적의 파트너
              </div>
            </h1>
            <div className="space-y-2">
              <p className="max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                Hpost와 함께라면 더 빠르고 효율적인 비즈니스 운영이 가능합니다.
              </p>
              <p className="max-w-md text-base text-gray-500 sm:text-lg md:max-w-3xl md:text-xl">
                최신 기술과 전문적인 서비스로 여러분의 성공을 함께 만들어갑니다.
              </p>
            </div>
            <div className="mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <Link
                to="/quick-order"
                className="rounded-md border border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-base font-medium text-white shadow-md transition-colors hover:from-blue-700 hover:to-indigo-700 md:px-10 md:py-4 md:text-lg"
              >
                바로 퀵 접수하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}
