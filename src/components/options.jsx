import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTask, useDispatch } from "../hooks/useTask";
import { useToast } from "../hooks/useToast";
import { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function PositionedMenu({ todoId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const tasks = useTask();
  const dispatch = useDispatch();
  const showToast = useToast();

  const currentTask = useMemo(
    () => tasks.find((todo) => todo.id === todoId),
    [tasks, todoId]
  );

  const [openConfirmation, setOpenConfirmation] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [editFormData, setEditFormData] = useState({
    title: currentTask ? currentTask.title : "",
    description: currentTask ? currentTask.description : "",
  });

  const handleClickOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };
  const handleClickOpenEdit = () => {
    if (!currentTask) return;
    setEditFormData({
      title: currentTask.title,
      description: currentTask.description,
    });
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleCompleted = (todoId) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: { id: todoId, completed: !currentTask.completed },
    });
  };
  const handleDelete = (todoId) => {
    dispatch({ type: "DELETE_TASK", payload: todoId });
    handleCloseConfirmation();
  };
  const handleEdit = (todoId) => {
    dispatch({ type: "UPDATE_TASK", payload: { id: todoId, ...editFormData } });
    handleCloseEdit();
  };

  return (
    <div>
      <Tooltip title="options">
        <IconButton>
          <MoreVertIcon
            className={`${
              currentTask?.completed
                ? "!text-[#8bfa9f] hover:!text-[#51f875]"
                : "!text-[#A78BFA] hover:!text-[#8B5CF6]"
            } text-sm sm:text-base !font-bold`}
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          ></MoreVertIcon>
        </IconButton>
      </Tooltip>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#242731",
            borderRadius: "10px",
            color: "#E5E7EB",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            paddingTop: "0",
            paddingBottom: "0",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleCompleted(todoId);
            handleClose();
            currentTask.completed
              ? showToast("success", "Task Became Uncompleted Successfully")
              : showToast("success", "Task Became Completed Successfully");
          }}
          sx={{
            "&:hover": {
              backgroundColor: "#3F3F46",
              color: "#51f875e4",
            },
          }}
        >
          <CheckCircleOutlineIcon fontSize="small" className="mr-2" />
          Done
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClickOpenEdit();
            handleClose();
          }}
          sx={{
            "&:hover": {
              backgroundColor: "#3F3F46",
              color: "#A78BFA",
            },
          }}
        >
          <EditIcon fontSize="small" className="mr-2" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClickOpenConfirmation();
            handleClose();
          }}
          sx={{
            "&:hover": {
              backgroundColor: "#3F3F46",
              color: "#F87171",
            },
          }}
        >
          <DeleteIcon fontSize="small" className="mr-2" />
          Delete
        </MenuItem>
      </Menu>

      <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        TransitionProps={{ timeout: 300 }}
        aria-labelledby="alert-dialog-title"
        PaperProps={{
          className:
            "!bg-[#1C1E26] !text-gray-200 !rounded-2xl !shadow-2xl w-[90%] sm:w-[450px] p-2",
        }}
      >
        <DialogTitle
          className="!text-[#f5f5f5] !text-sm sm:!text-xl"
          id="alert-dialog-title"
        >
          {"Are you sure you want to delete this task?"}
        </DialogTitle>
        <DialogActions>
          <Button
            className="!bg-gray-400 active:!scale-95 !rounded-xl !text-sm sm:!text-base !font-medium !text-[#F5F5F5] cursor-pointer  hover:!bg-gray-500  hover:!text-white transition-all duration-300"
            onClick={handleCloseConfirmation}
          >
            Disagree
          </Button>
          <Button
            className="!bg-[#f34848] active:!scale-95 !rounded-xl !text-sm sm:!text-base !font-medium !text-[#F5F5F5] cursor-pointer  hover:!bg-[#f91f1f] hover:!text-white transition-all duration-300"
            onClick={() => {
              handleDelete(todoId);
              handleCloseConfirmation();
              showToast("success", "Task Deleted Successfully");
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        TransitionProps={{ timeout: 300 }}
        aria-labelledby="alert-dialog-title"
        PaperProps={{
          className:
            "!bg-[#1C1E26] !text-gray-200 !rounded-2xl !shadow-2xl w-[90%] sm:w-[450px] p-2",
        }}
      >
        <DialogTitle
          className="!text-[#f5f5f5] !text-sm sm:!text-xl"
          id="alert-dialog-title"
        >
          {"Edit Task"}
        </DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit(todoId);
            handleCloseEdit();
            showToast("success", "Task Edited  Successfully");
          }}
          className="flex flex-col gap-3.5 justify-center items-center w-full max-w-md rounded-full"
        >
          <input
            value={editFormData.title}
            onChange={(e) => {
              setEditFormData({ ...editFormData, title: e.target.value });
            }}
            type="text"
            placeholder="Title"
            className="pl-6 w-full h-12 text-sm border bg-[#3A3C44] border-gray-500/30 rounded-full placeholder-gray-500 text-gray-200 outline-none placeholder:text-sm placeholder:font-medium"
            required
          />
          <input
            value={editFormData.description}
            onChange={(e) => {
              setEditFormData({ ...editFormData, description: e.target.value });
            }}
            type="text"
            placeholder="Description"
            className="pl-6 w-full h-12 text-sm border bg-[#3A3C44] border-gray-500/30 rounded-full placeholder-gray-500 text-gray-200 outline-none placeholder:text-sm placeholder:font-medium"
            required
          />
          <button
            type="submit"
            className="bg-[#A78BFA] active:scale-95 w-56 h-10.5 rounded-full text-sm font-medium text-[#F5F5F5] cursor-pointer mr-0.5 hover:bg-[#8B5CF6] hover:text-white transition-all duration-300"
          >
            Save Task
          </button>
        </form>
      </Dialog>
    </div>
  );
}
