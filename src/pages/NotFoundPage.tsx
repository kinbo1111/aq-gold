import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
    
    const { t } = useTranslation();

    return (
        <div className="w-screen h-screen flex items-center justify-center body-1b gray-600">
            {t("NotFoundPage!")}
        </div>
    );
};

export default NotFoundPage;