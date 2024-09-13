import { useSidebar } from '../contexts/SidebarContext';

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
    const { collapsed } = useSidebar();

  return (
    <div
      className={`pb-[120px] ${collapsed ? 'ml-[80px] w-[calc(100%-80px)]' : 'ml-[250px] w-[calc(100%-250px)]'} 
      transition-all duration-300 ease-in-out`}
    >
      <div className="mx-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
