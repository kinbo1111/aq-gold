interface MainContainerProps {
    children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> =({
    children
}) => {
    return (
        <div className="pb-[120px] ml-[250px]" style={{ width: 'calc(100% - 250px)' }}>
            <div className="mx-auto w-full">
                {children}
            </div>
        </div>
    );
};

export default MainContainer;