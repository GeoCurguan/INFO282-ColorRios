import { MaleIcon, FemaleIcon, QuestionMarkIcon } from "@/icons";
// Según el género, devuelve un icono de hombre ("Masculino"), mujer ("Femenino") o se desconoce el género
const ResolveGenderIcon = (props) => {
  const { gender, className, ...restProps } = props;
  const baseClass = "w-4 h-4";

  switch (gender) {
    case "Masculino":
      return <MaleIcon className={`fill-blue-500 ${baseClass} ${className}`} {...restProps} />;
    case "Femenino":
      return <FemaleIcon className={`fill-red-500 ${baseClass} ${className}`} {...restProps} />;
    default:
      return <QuestionMarkIcon className={`fill-gray-500 ${baseClass} ${className}`} {...restProps} />;
  }
};

export default ResolveGenderIcon;
