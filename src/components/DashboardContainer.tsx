interface DashboardContainerProps {
    children: React.ReactNode;
}

const DashboardContainer: React.FC<DashboardContainerProps> =({
    children
}) => {
    return (
        <div className="pt-[80px] pb-[120px] ml-[250px] xl:px-20 md:px-10 sm:px-2 px-4" style={{ width: 'calc(100% - 250px)' }}>
            <div className="mx-auto w-full">
                {children}
            </div>
        </div>
    );
};

export default DashboardContainer;