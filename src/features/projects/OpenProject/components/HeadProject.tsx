// Components
import { LucideFolderClosed } from "lucide-react";
import { Tooltip } from "../../../../components/Tooltip/Tooltip";
import { EditableText } from "../../../../components/EditableText/EditableText";
import { DatePicker } from "../../../../components/DatePicker/DatePicker";

// Context
import { useOpenProjectContext } from "../../context/useOpenProjectContext";

// Styles
import styles from "../style.module.css";

const HeadProject = () => {

  const { project, dispatchProject } = useOpenProjectContext();

  if (!project) return null;

  const {title, description, status, deadline} = project;


  const statusColor = () => {
    switch (status) {
      case "done":
        return "success";
      case "progress":
        return "primary";
      case "canceled":
        return "error";
      case "pending":
        return "warning";
      default:
        return "primary";
    }
  };

  const handlerText = (label: "title" | "description") => {
    return (text: string) => dispatchProject({type: `set-${label}`, value: text});
  };

  return (
    <div className={styles.headProject}>
      <LucideFolderClosed size={70} className={styles.projectIcon} />
      <div className={styles.projectInfoContainer}>
        <EditableText textSize={'2rem'} as="h1" value={title} placeholder="Enter title..." setValue={handlerText('title')} min={3} max={50} />
        <EditableText textSize={'1rem'} as="p" value={description} placeholder="Enter description..." setValue={handlerText('description')} min={10} max={100} />
        <div className={styles.smallInfoProject}>
          <Tooltip variant={statusColor()} inline>
            {`● ${status}`}
          </Tooltip>
          <DatePicker deadline={deadline} onChange={(value) => dispatchProject({type: "set-deadline", value})} />
        </div>
      </div>
    </div>
  );
};

export { HeadProject };
