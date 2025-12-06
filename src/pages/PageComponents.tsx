import Text from "../components/Text";
import Icon from "../components/Icon";
import CheckIcon from "../assets/icons/check.svg?react";
import PencilIcon from "../assets/icons/pencil.svg?react";
import PlusIcon from "../assets/icons/plus.svg?react";
import SpinnerIcon from "../assets/icons/spinner.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import XIcon from "../assets/icons/x.svg?react";
import Badge from "../components/Badge";
import Button from "../components/Button";
import ButtonIcon from "../components/ButtonIcon";
import TextInput from "../components/TextInput";
import InputCheckbox from "../components/InputCheckbox";
import Card from "../components/Card";
import Container from "../components/Container";

export default function PageComponents() {
  return (
    <Container>
      <div className="grid gap-10">
        <Text variant="body-md" className="text-green-base">
          Hello1
        </Text>

        <div className="flex gap-1">
          <Icon svg={CheckIcon} />
          <Icon svg={PencilIcon} />
          <Icon svg={PlusIcon} />
          <Icon svg={SpinnerIcon} animate />
          <Icon svg={TrashIcon} />
          <Icon svg={XIcon} />
        </div>

        <div>
          <Badge variant="secondary">5</Badge>
          <Badge variant="secondary">5 de 10</Badge>
        </div>

        <div>
          <Button icon={PlusIcon}>New task</Button>
        </div>

        <div>
          <ButtonIcon icon={PlusIcon} />
          <ButtonIcon icon={TrashIcon} variant="secondary" />
          <ButtonIcon icon={XIcon} variant="tertiary" />
        </div>

        <div>
          <TextInput />
        </div>

        <div>
          <InputCheckbox />
        </div>

        <div>
          <Card>Hello</Card>
        </div>
      </div>
    </Container>
  );
}
