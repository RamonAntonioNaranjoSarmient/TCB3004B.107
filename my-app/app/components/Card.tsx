// app/components/Card.tsx
// app/components/Card.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ReactNode } from 'react'; // Importar ReactNode para tipar children

// Definir las props del componente
interface CardFunProps {
  id?: number;
  title?: string;
  description?: string;
  footer?: string;
  className?: string; // Clases de Tailwind para el contenedor principal
  titleClassName?: string; // Clases de Tailwind para el título
  descriptionClassName?: string; // Clases de Tailwind para la descripción
  footerClassName?: string; // Clases de Tailwind para el footer
  children?: ReactNode; // Contenido personalizado
}

export default function CardFun({
  id = 0,
  title = "Card Title", // Valor por defecto
  description = "Card Description", // Valor por defecto
  footer = "Card Footer", // Valor por defecto
  className = "", // Clases por defecto
  titleClassName = "", // Clases por defecto
  descriptionClassName = "", // Clases por defecto
  footerClassName = "", // Clases por defecto
  children, // Contenido personalizado
}: CardFunProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className={titleClassName}>{id}. {title}</CardTitle>
        <CardDescription className={descriptionClassName}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children} {/* Renderizar el contenido personalizado aquí */}
      </CardContent>
      <CardFooter className={footerClassName}>
        <p>{footer}</p>
      </CardFooter>
    </Card>
  );
}