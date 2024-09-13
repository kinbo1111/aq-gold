import { useSidebar } from '../contexts/SidebarContext';

export type DashboardContainerProps = {
  children: React.ReactNode;
};

const DashboardContainer: React.FC<DashboardContainerProps> = ({ children }) => {
    const { collapsed } = useSidebar();
    console.log(collapsed)

  return (
    <div
      className={`pt-[80px] pb-[120px] xl:px-20 md:px-10 sm:px-2 px-4 
      ${collapsed ? 'ml-[80px] w-[calc(100%-80px)]' : 'ml-[250px] w-[calc(100%-250px)]'} 
      transition-all duration-300 ease-in-out`}
    >
      <div className="mx-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default DashboardContainer;
