import {
  Button,
  Group,
  Title,
  Container,
  Paper,
  Text,
  Stack,
  TextInput,
  Image,
  Tooltip,
} from "@mantine/core";
import { useState } from "react";
import { DateTimePicker } from "@mantine/dates";

function nextPage(page: number, setPage: any) {
  setPage(page + 1);
}

function changeButtonSizengYes() {
  return {
    width: "100%",
    height: "100%",
  };
}

export default function IndexPage() {
  const [page, setPage] = useState(1);
  const [noCount, setNoCount] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(100);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [name, setName] = useState("Louella Marie Lizardo");
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const createGoogleCalendarLink = (date: Date) => {
    const event = {
      text: `Valentine's Date with ${name} ❤️`,
      dates: {
        start: date.toISOString().replace(/-|:|\.\d\d\d/g, ""),
        end: new Date(date.getTime() + 2 * 60 * 60 * 1000)
          .toISOString()
          .replace(/-|:|\.\d\d\d/g, ""),
      },
      details:
        `Special Valentine's date with my love! 🥰\n\n` +
        `Name: ${name}\n` +
        `Location: ${location}\n\n` +
        `Organizer: syjeikoo@gmail.com`,
      location: location || "Online Date",
      attendees: "syjeikoo@gmail.com",
    };

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.text
    )}&dates=${event.dates.start}/${
      event.dates.end
    }&details=${encodeURIComponent(
      event.details
    )}&location=${encodeURIComponent(event.location)}&add=${encodeURIComponent(
      event.attendees
    )}`;
  };

  const getRandomPosition = () => {
    const maxWidth = window.innerWidth - 200; // button width
    const maxHeight = window.innerHeight - 50; // button height
    return {
      top: Math.random() * maxHeight,
      left: Math.random() * maxWidth,
    };
  };

  const sadGifs = [
    "https://media4.giphy.com/avatars/snuggleserenades/pupMIQLZwa5p.gif",
    "https://media.giphy.com/media/JER2en0ZRiGUE/giphy.gif",
    "https://media.giphy.com/media/l3vQZ8ko4l0nvjm2Q/giphy.gif",
    "https://media.giphy.com/media/ckGndVa23sCk9pae4l/giphy.gif",
    "https://media.giphy.com/media/9Y5BbDSkSTiY8/giphy.gif",
  ];

  const handleNoClick = (e: React.FormEvent) => {
    e.preventDefault();
    setNoCount(noCount + 1);
    setYesButtonSize((prev) => prev + 50);
    setNoButtonPosition(getRandomPosition());
  };

  return (
    <div
      style={{
        backgroundImage: `url("/bgpic.png")`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Container>
        <Group justify="center" p={50}>
          <Title c={"white"} order={1}>
            Goodmorning or Goodevening, loveee!!
          </Title>
        </Group>
        <Paper
          shadow="xl"
          radius="md"
          withBorder
          p="xl"
          style={{
            background:
              "linear-gradient(135deg, #f3e7ff 0%, #e5ccff 50%, #d4b3ff 100%)",
          }}
        >
          {page === 1 && (
            <Stack
              style={{
                background:
                  "linear-gradient(135deg, #f3e7ff 0%, #e5ccff 50%, #d4b3ff 100%)",
              }}
              align="stretch"
              justify="center"
              gap="md"
            >
              <Group justify="center">
                <Title order={2}>
                  Contract - para alam mong ikaw lang, love!!
                </Title>
              </Group>
              <form onSubmit={() => nextPage(page, setPage)}>
                <TextInput
                  label="name mo sana dito pero oks na sa name, need to see u nalang my cutie future everything &lt;3 lovee"
                  value={name}
                  onChange={(event) => setName(event.currentTarget.value)}
                  disabled
                />
                <TextInput
                  mt={20}
                  label="Taga san ka ba kase, love?"
                  placeholder="pageto, laguna lang nanaman..."
                  value={location}
                  onChange={(event) => setLocation(event.currentTarget.value)}
                />
                <Button
                  type="submit"
                  variant="filled"
                  color="purple"
                  fullWidth
                  mt={20}
                >
                  Continue
                </Button>
              </form>
            </Stack>
          )}
          {page === 2 && (
            <Stack
              style={{
                background:
                  "linear-gradient(135deg, #f3e7ff 0%, #e5ccff 50%, #d4b3ff 100%)",
              }}
              align="stretch"
              justify="center"
              gap="md"
            >
              <Stack align="center">
                <Image
                  w={300}
                  h={300}
                  src={sadGifs[Math.min(noCount, sadGifs.length - 1)]}
                  alt="Teddy Bear"
                />
                <Title order={2}>
                  Can you be my Valentine's date, love?
                  <Text ta={"center"} c="dimmed">
                    {noCount > 0
                      ? "Please say yes na 🥺"
                      : "(yes kahit online lang!)"}
                  </Text>
                </Title>
              </Stack>
              <form onSubmit={() => nextPage(page, setPage)}>
                <Group grow>
                  <Button
                    type="submit"
                    variant="filled"
                    color="purple"
                    mt={20}
                    style={{
                      transform: `scale(${yesButtonSize / 100})`,
                      transition: "transform 0.3s",
                    }}
                  >
                    Yes, love!!
                  </Button>
                  <Tooltip label={noCount >= 5 ? "Panay ka na no huhu 😭" : ""}>
                    <Button
                      onClick={handleNoClick}
                      variant="gradient"
                      gradient={{ from: "red", to: "pink", deg: 90 }}
                      mt={10}
                      disabled={noCount >= 5}
                      style={{
                        transform: `scale(${Math.max(0.5, 1 - noCount * 0.1)}`,
                        transition: "transform 0.3s",
                        position: "absolute",
                        top: `${noButtonPosition.top}px`,
                        left: `${noButtonPosition.left}px`,
                      }}
                    >
                      {noCount > 0 ? "Still no? 😢" : "No????"}
                    </Button>
                  </Tooltip>
                </Group>
              </form>
            </Stack>
          )}
          {page === 3 && (
            <Stack
              style={{
                background:
                  "linear-gradient(135deg, #f3e7ff 0%, #e5ccff 50%, #d4b3ff 100%)",
              }}
              align="stretch"
              justify="center"
              gap="md"
            >
              <Group justify="center">
                <Image
                  src="https://miro.medium.com/v2/resize:fit:996/0*tFoonOftE3nVcW8z"
                  alt="Teddy Bear"
                  w={300}
                  h={300}
                />
                <Title order={2}>
                  Thank you for saying yes, love!! Now, kelan ka kaya pwede?
                  kahit hindi magkita basta magkausap lang tayo, love! 💕
                </Title>
              </Group>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (selectedDate) setPage(page + 1);
                }}
              >
                <DateTimePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  valueFormat="DD MMM YYYY hh:mm A"
                  label="Pick date and time"
                  placeholder="Pick date and time"
                  excludeDate={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today; // Disable past dates
                  }}
                  required
                />
                <Button
                  type="submit"
                  variant="filled"
                  color="purple"
                  fullWidth
                  mt={20}
                  disabled={!selectedDate}
                >
                  Set our date! 💕
                </Button>
              </form>
            </Stack>
          )}
          {page === 4 && selectedDate && (
            <Stack
              style={{
                background:
                  "linear-gradient(135deg, #f3e7ff 0%, #e5ccff 50%, #d4b3ff 100%)",
              }}
              align="stretch"
              justify="center"
              gap="md"
            >
              <Stack align="center">
                <Image
                  src="https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif"
                  alt="Thank You Bear"
                  w={300}
                  h={300}
                />
                <Title order={2} ta="center">
                  Thank you for being my Valentine, love! 💝
                  <Text c="dimmed" size="lg" mt={10}>
                    Our special date is set for{" "}
                    {selectedDate.toLocaleDateString()} at{" "}
                    {selectedDate.toLocaleTimeString()}!
                  </Text>
                  <Text c="dimmed" size="md" mt={5}>
                    I'll make sure it'll be super sweet and special! 🌹
                  </Text>
                </Title>
              </Stack>
              <Button
                component="a"
                href={createGoogleCalendarLink(selectedDate)}
                target="_blank"
                variant="gradient"
                gradient={{ from: "pink", to: "violet" }}
                fullWidth
                mt={20}
              >
                Add our date to Google Calendar 📅
              </Button>
            </Stack>
          )}
        </Paper>
      </Container>
    </div>
  );
}
