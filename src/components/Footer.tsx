import React from 'react';

function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              이용약관
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              개인정보처리방침
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              고객센터
            </a>
          </div>
          <div className="text-center text-sm text-gray-500">
            <p>이메일: contact@hpost.co.kr</p>
            <p>전화: 1544-1111</p>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Hpost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
