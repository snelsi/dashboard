import * as React from "react";
import { useThrottle } from "react-use";
import { useDeskName } from "utils/hooks";
import { Input } from "components";

interface DeskNameProps {
  id: number;
  initialName: string;
}

export const DeskName: React.FC<DeskNameProps> = ({ id, initialName }) => {
  const [name, setName] = React.useState(initialName);
  const debouncedName = useThrottle(name);
  const [updateName] = useDeskName({ id, name });

  React.useEffect(() => {
    if (debouncedName && initialName !== debouncedName) {
      updateName();
    }
  }, [initialName, debouncedName, updateName]);

  return (
    <Input
      value={name}
      onChange={(newValue) => setName(newValue.target.value)}
      data-size="big"
    />
  );
};
