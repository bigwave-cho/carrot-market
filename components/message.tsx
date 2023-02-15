import { cls, imgFn } from '@/libs/client/utils';
import Image from 'next/image';

interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
}

export default function Message({
  message,
  reversed,
  avatarUrl,
}: MessageProps) {
  return (
    <div
      className={cls(
        'flex items-center space-x-2',
        reversed ? 'flex-row-reverse space-x-reverse' : ''
      )}
    >
      {avatarUrl ? (
        <div className="relative h-[36px] w-[36px]">
          <Image
            src={imgFn(avatarUrl, 'avatar')}
            fill
            alt="avatar"
            className="h-8 w-8 rounded-full bg-slate-400"
          />
        </div>
      ) : (
        <div className="h-8 w-8 rounded-full bg-slate-400" />
      )}
      <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
        <p>{message}</p>
      </div>
    </div>
  );
}
