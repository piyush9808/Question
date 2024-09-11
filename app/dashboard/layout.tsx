import Header from "./_components/Header";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <div className="mx-5 md:mx-20 lg:mx-36">
                {children}
            </div>
        </>
    );
}
