import type { IntentProps, MaybeElement, Props } from "../../common/props";
import type { IconName } from "../icon/icon";
export interface InputSharedProps extends IntentProps, Props {
    disabled?: boolean;
    fill?: boolean;
    inputClassName?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    leftElement?: JSX.Element;
    leftIcon?: IconName | MaybeElement;
    placeholder?: string;
    rightElement?: JSX.Element;
}
