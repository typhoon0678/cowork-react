export const formatSeconds = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export const formatIso = (iso: string) => {
    const date = new Date(iso);
    const timeZone = "Asia/Seoul"; // Asia/Seoul, UTC

    const year = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', timeZone: timeZone }).format(date);
    const month = new Intl.DateTimeFormat('ko-KR', { month: '2-digit', timeZone: timeZone }).format(date);
    const day = new Intl.DateTimeFormat('ko-KR', { day: '2-digit', timeZone: timeZone }).format(date);
    const hour = new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', hour12: false, timeZone: timeZone }).format(date);
    const minute = new Intl.DateTimeFormat('ko-KR', { minute: '2-digit', timeZone: timeZone }).format(date);

    return `${year} ${month} ${day} ${hour} ${minute}분`;
}

export const utcToKst = (iso: string) => {
    const utcDate = new Date(iso);
    const kstDate = new Date(utcDate.setHours(new Date(iso).getHours() + 9));

    return kstDate.toISOString();
}