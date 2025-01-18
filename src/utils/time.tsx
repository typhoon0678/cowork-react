export const formatSeconds = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export const formatKST = (iso: string) => {
    const date = new Date(iso);

    const year = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', timeZone: 'Asia/Seoul' }).format(date);
    const month = new Intl.DateTimeFormat('ko-KR', { month: '2-digit', timeZone: 'Asia/Seoul' }).format(date);
    const day = new Intl.DateTimeFormat('ko-KR', { day: '2-digit', timeZone: 'Asia/Seoul' }).format(date);
    const hour = new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', hour12: false, timeZone: 'Asia/Seoul' }).format(date);
    const minute = new Intl.DateTimeFormat('ko-KR', { minute: '2-digit', timeZone: 'Asia/Seoul' }).format(date);

    return `${year} ${month} ${day} ${hour} ${minute}분`;
}