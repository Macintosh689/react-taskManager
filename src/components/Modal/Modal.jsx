import { useEffect, useState } from "react";
import st from "./Modal.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { statusNames } from "../../utills";
export default function Modal({ editingTask, addTask }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [editingTask]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string("Введите название задачи")
      .required("Название задачи обязательно")
      .min(5, "Имя задачи должно содержать минимум 5 символов"),

    description: Yup.string("Введите название задачи")
      .required("Описание задачи обязательно")
      .min(5, "Описание должно содержать минимум 5 символов"),

    project: Yup.string("Введите название проекта").required(
      "Название проекта обязательно"
    ),
    dateTime: Yup.date("Введите дату").required("Дата обязательна").nullable(),
    startTime: Yup.string("Введите время начала").required(
      "Время начала обязательно"
    ),
    endTime: Yup.string("Введите время окончания").required(
      "Время окончания обязательно"
    ),
    priority: Yup.string("Укажите приоритет").required("Приоритет обязателен"),
    assignee: Yup.string("Укажите исполнителя").required(
      "Исполнитель обязателен"
    ),
  });
  const formik = useFormik({
    initialValues: {
      name: editingTask ? editingTask.name : "",
      description: editingTask ? editingTask.description : "",
      project: editingTask ? editingTask.project : "",
      dateTime: editingTask ? editingTask.dateTime.split(" ")[0] : "",
      startTime: editingTask ? editingTask.dateTime.split(" ")[1] : "",
      endTime: editingTask ? editingTask.dateTime.split(" ")[3] : "",
      priority: editingTask ? editingTask.priority : "",
      assignee: editingTask ? editingTask.assignee : "",
      status: editingTask ? editingTask.status : statusNames.TODO,
    },
    validationSchema,
    onSubmit: (values) => {
      addTask({
        id: editingTask ? editingTask.id : Date.now(),
        name: values.name,
        description: values.description,
        project: values.project,
        dateTime: `${values.dateTime} ${values.startTime} - ${values.endTime}`,
        priority: values.priority,
        assignee: values.assignee,
        status: values.status,
      });
      formik.resetForm();
      handleClose();
    },
  });

  useEffect(() => {
    if (editingTask) {
      formik.setValues({
        name: editingTask.name,
        description: editingTask.description,
        project: editingTask.project,
        dateTime: editingTask.dateTime.split(" ")[0],
        startTime: editingTask.dateTime.split(" ")[1],
        endTime: editingTask.dateTime.split(" ")[3],
        priority: editingTask.priority,
        assignee: editingTask.assignee,
        status: editingTask.status,
      });
    } else {
      formik.resetForm();
    }
  }, [editingTask]);

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className={st.root}>
      {!isOpen && (
        <button className={st.addButton} onClick={() => setIsOpen(true)}>
          + Add Task
        </button>
      )}
      {isOpen && (
        <form onSubmit={formik.handleSubmit} className={st.modal}>
          <Container
            maxWidth="sm"
            style={{
              backgroundColor: "#fff",
              padding: "75px 30px 50px 40px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              width: "600px",
              position: "relative",
              margin: "0",
            }}
          >
            <CloseIcon
              type="button"
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                fontSize: "18px",
                color: "#0D062D",
                cursor: "pointer",
                borderRadius: "30%",
                background: "rgba(120, 116, 134, 0.2)",
                width: "32px",
                height: "32px",
              }}
            >
              <span className="material-icons">close</span>
            </CloseIcon>
            <div className={st.topRow}>
              <Typography
                variant="h4"
                gutterBottom
                style={{
                  margin: "0 0 27px 0",
                  fontSize: "36px",
                  fontWeight: "500",
                  lineHeight: "43.57px",
                  color: "#0D062D",
                }}
              >
                Add Task
              </Typography>
              <Typography
                variant="body2"
                align="right"
                gutterBottom
                style={{
                  margin: "0",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "19.36px",
                  color: "#787486",
                }}
              >
                Today {currentDate}
              </Typography>
            </div>
            <InputLabel
              style={{
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "19.36px",
                marginBottom: "14px",
                color: "#0D062D",
              }}
            >
              Name the task
            </InputLabel>
            <TextField
              style={{
                marginBottom: "20px",
              }}
              variant="outlined"
              fullWidth
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            {formik.touched.name && formik.errors.name && (
              <div className={st.yupError}>{formik.errors.name}</div>
            )}
            <InputLabel
              style={{
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "19.36px",
                marginBottom: "14px",
                color: "#0D062D",
              }}
            >
              Description
            </InputLabel>
            <TextField
              style={{
                marginBottom: "20px",
              }}
              variant="outlined"
              fullWidth
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
            />
            {formik.touched.description && formik.errors.description && (
              <div className={st.yupError}>{formik.errors.description}</div>
            )}
            <InputLabel
              style={{
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "19.36px",
                marginBottom: "13px",
                color: "#0D062D",
              }}
            >
              Project name
            </InputLabel>
            <TextField
              style={{
                marginBottom: "20px",
              }}
              variant="outlined"
              fullWidth
              id="project"
              name="project"
              value={formik.values.project}
              onChange={formik.handleChange}
              error={formik.touched.project && Boolean(formik.errors.project)}
            />
            {formik.touched.project && formik.errors.project && (
              <div className={st.yupError}>{formik.errors.project}</div>
            )}
            <Grid
              container
              spacing={2}
              style={{
                alignItems: "end",
                margin: "0 auto",
                justifyContent: "space-between",
                maxWidth: "530px",
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  padding: "0",
                  maxWidth: "240px",
                  marginBottom: "20px",
                }}
              >
                <InputLabel
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "19.36px",
                    marginBottom: "13px",
                    color: "#0D062D",
                  }}
                >
                  Due Date/Time
                </InputLabel>
                <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  id="dateTime"
                  name="dateTime"
                  value={formik.values.dateTime}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.dateTime && Boolean(formik.errors.dateTime)
                  }
                  style={{
                    fontWeight: "500",
                    fontSize: "14.57px",
                    lineHeight: "17.64px",
                    letterSpacing: "0%",
                    marginBottom: "20px",
                  }}
                />
                {formik.touched.dateTime && formik.errors.dateTime && (
                  <div className={st.yupError}>{formik.errors.dateTime}</div>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                style={{
                  padding: "0",
                  maxWidth: "100px",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  label="Start Time"
                  type="time"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  id="startTime"
                  name="startTime"
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.startTime && Boolean(formik.errors.startTime)
                  }
                  style={{
                    maxWidth: "150px",
                    marginBottom: "20px",
                  }}
                />
                {formik.touched.startTime && formik.errors.startTime && (
                  <div className={st.yupError}>{formik.errors.startTime}</div>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                style={{
                  padding: "0",
                  maxWidth: "100px",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  label="End Time"
                  type="time"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  id="endTime"
                  name="endTime"
                  value={formik.values.endTime}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.endTime && Boolean(formik.errors.endTime)
                  }
                  style={{
                    maxWidth: "100px",
                    marginBottom: "20px",
                  }}
                />
                {formik.touched.endTime && formik.errors.endTime && (
                  <div className={st.yupError}>{formik.errors.endTime}</div>
                )}
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              style={{
                margin: "0 auto 78px",
                justifyContent: "space-between",
                maxWidth: "530px",
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                style={{ padding: "0", maxWidth: "240px" }}
              >
                <InputLabel
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "19.36px",
                    marginBottom: "13px",
                    color: "#0D062D",
                  }}
                >
                  Task Priority
                </InputLabel>
                <Select
                  style={{ marginBottom: "20px" }}
                  variant="outlined"
                  fullWidth
                  id="priority"
                  name="priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.priority && Boolean(formik.errors.priority)
                  }
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
                {formik.touched.priority && formik.errors.priority && (
                  <div className={st.yupError}>{formik.errors.priority}</div>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{ padding: "0", maxWidth: "240px" }}
              >
                <InputLabel
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "19.36px",
                    marginBottom: "14px",
                    color: "#0D062D",
                  }}
                >
                  Task Assignee
                </InputLabel>
                <TextField
                  style={{ marginBottom: "20px" }}
                  variant="outlined"
                  fullWidth
                  id="assignee"
                  name="assignee"
                  value={formik.values.assignee}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.assignee && Boolean(formik.errors.assignee)
                  }
                />
                {formik.touched.assignee && formik.errors.assignee && (
                  <div className={st.yupError}>{formik.errors.assignee}</div>
                )}
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Grid item style={{ padding: "0" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    textTransform: "none",
                    padding: "15px 71px",
                    fontWeight: "500",
                    fontSize: "16px",
                    lineHeight: "19.36px",
                    letteSrpacing: "0%",
                    color: "#fff",
                    marginBottom: "20px",
                  }}
                  type="submit"
                >
                  Save
                </Button>
              </Grid>
              <Grid item style={{ padding: "0" }}>
                <Button
                  type="button"
                  onClick={handleClose}
                  style={{
                    fontWeight: "500",
                    fontSize: "14.57px",
                    lineHeight: "17.64px",
                    letteSrpacing: "0%",
                    color: "#0D062D",
                    textTransform: "none",
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Container>
        </form>
      )}
    </div>
  );
}
