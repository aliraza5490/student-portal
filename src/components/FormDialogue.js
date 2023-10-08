import { db } from "@/config/firebase/firestore";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function FormDialog({ open, handleClose, editDetails }) {
  const studentCollection = collection(db, "students");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: "M",
    },
  });

  useEffect(() => {
    if (editDetails) {
      setValue("name", editDetails.name);
      setValue("email", editDetails.email);
      setValue("gender", editDetails.gender);
      setValue("age", editDetails.entry_age);
      setValue("gpa", editDetails.gpa);
    }
  }, [editDetails, setValue]);

  const onSubmit = async (data) => {
    try {
      const details = {
        name: data.name,
        email: data.email,
        gender: data.gender,
        entry_age: data.age,
        gpa: data.gpa,
      };
      if (editDetails?.id) {
        const docRef = doc(db, "students", editDetails.id);
        await updateDoc(docRef, details);
      } else {
        await addDoc(studentCollection, details);
      }
    } catch (err) {
      alert("Error saving document");
      console.log(err);
    } finally {
      handleClose();
    }
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
        <DialogTitle sx={{ mb: 0 }}>
          {editDetails?.name ? "Edit" : "Add"} User
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
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
            {errors.gender && <span>This field is required</span>}

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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
