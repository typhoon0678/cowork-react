import { ReactNode } from "react";
import Header from "../components/common/Header";

function ChattingLayout({ children }: { children: ReactNode }) {

    return (
        <main className={"w-full h-screen"}>
            <div className="mx-auto">
                <Header />
                {children}
            </div>
        </main>
    );
}

export default ChattingLayout;