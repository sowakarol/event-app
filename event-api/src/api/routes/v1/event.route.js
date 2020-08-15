import { Router } from "express";
import { EventController } from "../../controllers/event.controller";
import { EventService } from "../../services/event.service";

const router = Router();
router.eventController = new EventController(new EventService());

router.post("/", (req, res) => router.eventController.createEvent(req, res));

router.get("/", (req, res) => router.eventController.getAllEvents(req, res));

export default router;
