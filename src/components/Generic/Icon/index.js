import { kebabToPascalCase } from '@/utils/genericFunc';
import * as HIcons from '@heroicons/react/24/outline';

const Icon = props => {
    const { name, className } = props;
    const iconName = kebabToPascalCase(name)+'Icon';
    const TheIcon = HIcons[iconName];

  if (!TheIcon) {
    console.error(`Icon "${iconName}" not found`);
    return null;
  }

  return <TheIcon className={className} aria-hidden='true' />;
};

export default Icon;
