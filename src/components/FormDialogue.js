import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function FormDialog({ open, handleClose, editDetails }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (editDetails) {
      console.log(editDetails.gender);
      setValue("name", editDetails.name);
      setValue("email", editDetails.email);
      setValue("gender", editDetails.gender);
      setValue("age", editDetails.entry_age);
      setValue("gpa", editDetails.gpa);
    }
  }, [editDetails, setValue]);
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
          reset();
        }}
      >
        <DialogTitle>{editDetails ? "Edit" : "Add"} User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              {...register("name", { required: true })}
            />
            {errors.name && <span>This field is required</span>}
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}

            {/* Gender */}
            <FormControl variant="standard" sx={{ mt: 2, width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Gender
              </InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-simple-select-standard-label"
                id="gender"
                label="Gender"
                defaultValue={editDetails?.gender ? editDetails.gender : "M"}
                {...register("gender", { required: true })}
              >
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
              </Select>
            </FormControl>

            {/* Age */}
            <TextField
              autoFocus
              margin="dense"
              id="age"
              label="Age"
              type="number"
              fullWidth
              variant="standard"
              {...register("age", { required: true })}
            />

            {/* GPA */}
            <TextField
              autoFocus
              margin="dense"
              id="gpa"
              label="GPA"
              type="number"
              fullWidth
              variant="standard"
              {...register("gpa", { required: true })}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
