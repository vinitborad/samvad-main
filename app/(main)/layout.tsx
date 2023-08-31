import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({
    children
} : {
    children: React.ReactNode;
}) => {
    return ( 
        <div className="h-full">
            <div className=" hidden md:flex w-[72px] h-full z-20 flex-col fixed inset-y-0">
                <NavigationSidebar/>
            </div>
            <main className="md:pl-[72px] h-full">
                {children}
            </main>
        </div>
     );
}
 
export default MainLayout;