import React, {
  useEffect,
  useState,
} from 'react';

type Props = {
    index: number,
	status: boolean;
    onToggleChange: (index: number, status: boolean) => void;
};

const Toggle = ({index, status, onToggleChange }: Props) => {
	const [toggleactive, setToggleActive] = useState(false);

	const toggleclickhandler = () => {
		setToggleActive((prev) => !prev);
        onToggleChange(index, toggleactive);
	};
	useEffect(() => {
		setToggleActive(status);
	}, [status]);
	return (
		<div onClick={toggleclickhandler} className={`w-9 cursor-pointer relative h-4 rounded-xl ${
            toggleactive ? "bg-blue-300" : " bg-gray-400"
        }`}>
			<div
				className={` w-5 absolute -top-0.5 ${
					toggleactive ? "left-4 bg-blue-400" : "left-0 bg-gray-500"
				} duration-200  h-5 rounded-full `}
			></div>
		</div>
	);
};

export default Toggle;
