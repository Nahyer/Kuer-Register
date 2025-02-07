import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	GamepadIcon as GameController,
	ExternalLink,
	CheckCircle,
	XCircle,
} from "lucide-react";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileUpload } from "@/components/FileUpload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { ReviewSubmitProps } from "./UniversityVerification";
import type { RegistrationFormData } from "@/types/registration";
import { useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchemaBase = z.object({
	whatsapp: z
		.string()
		.min(10, { message: "WhatsApp number must be at least 10 digits." })
		.optional(),
	discordUsername: z
		.string()
		.min(2, { message: "Discord username must be at least 2 characters." })
		.max(32, { message: "Discord username must be at most 32 characters." })
		.regex(/^[a-z0-9_.]{2,32}$/, {
			message:
				"Discord username can only contain lowercase letters, numbers, dots, and underscores.",
		}),
	discordScreenshot: z
		.any()
		.refine(
			(file) =>
				file instanceof File ||
				file instanceof Blob ||
				typeof file === "string",
			"Discord screenshot is required"
		)
		.refine((file) => {
			if (file instanceof File || file instanceof Blob) {
				return file.size <= MAX_FILE_SIZE;
			}
			return true;
		}, `Max file size is 5MB.`),
	// Other common fields
	has2v2Partner: z.enum(["yes", "no"]).optional(),
	isCaptain: z.enum(["yes", "no"]).optional(),
	teamCaptainName: z.string().optional(),
	hasTeam: z.enum(["yes", "no"]).optional(),
	teamName: z.string().optional(),
	playerRole: z.enum(["main", "sub"]).optional(),
	// Fields for COD / PUBGM / CODMMP games (initially optional)
	inGameName: z.string().optional(),
	inGameId: z.string().optional(),
	boardsiderUsername: z.string().optional(),
	boardsiderScreenshot: z
		.any()
		.refine(
			(file) =>
				file instanceof File ||
				file instanceof Blob ||
				typeof file === "string",
			"Boardsider screenshot is required"
		)
		.refine((file) => {
			if (file instanceof File || file instanceof Blob) {
				return file.size <= MAX_FILE_SIZE;
			}
			return true;
		}, `Max file size is 5MB.`)
		.optional(),
});

export default function ContactGamingInfo({
	formData,
	updateFormData,
	prevStep,
	nextStep,
	gameId,
}: Readonly<ReviewSubmitProps>) {
	const isEAFC2v2Open = gameId === "3"; // EAFC 2v2 Open
	const isPUBGM = gameId === "2"; // PUBGM
	const isCODM = gameId === "1"; // CODM
	const isCODMMP = gameId === "7"; // CODM MP
	const isEFootballMobile = gameId === "8"; // eFootball Mobile
	const isConditionalGame = isCODM || isPUBGM || isCODMMP;
	const [discordUsernameValid, setDiscordUsernameValid] = useState<boolean | null>(null);

	const formSchema = formSchemaBase.superRefine((values, ctx) => {
    // Conditional validations for game fields
    if (isConditionalGame) {
        if (!values.inGameName || values.inGameName.trim() === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "In-Game Name is required for this game.",
                path: ["inGameName"],
            });
        }
        if (!values.inGameId || values.inGameId.trim() === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "In-Game ID is required for this game.",
                path: ["inGameId"],
            });
        }
        if (!values.boardsiderUsername || values.boardsiderUsername.trim() === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Boardsider Username is required for this game.",
                path: ["boardsiderUsername"],
            });
        }
        if (!values.boardsiderScreenshot) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Boardsider Screenshot is required for this game.",
                path: ["boardsiderScreenshot"],
            });
        }
    }

    // Conditional validations for team fields
    if (values.hasTeam === "yes") {
        if (!values.teamName || values.teamName.trim() === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Team Name is required.",
                path: ["teamName"],
            });
        }
        if (values.isCaptain === "no" && (!values.teamCaptainName || values.teamCaptainName.trim() === "")) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Team Captain's Name is required when you are not the captain.",
                path: ["teamCaptainName"],
            });
        }
    }
});

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        whatsapp: formData.whatsapp || "",
        discordUsername: formData.discordUsername || "",
        discordScreenshot: formData.discordScreenshot || formData.discordScreenshotPreview || undefined,
        has2v2Partner: (formData.has2v2Partner as "yes" | "no") || "no",
        isCaptain:
            (formData.isCaptain as "yes" | "no") ||
            (isCODM || isPUBGM || isCODMMP ? "yes" : "no"),
        teamCaptainName: formData.teamCaptainName || "",
        hasTeam: (formData.hasTeam as "yes" | "no") || "no",
        teamName: formData.teamName || "",
        playerRole:
            (formData.playerRole as "main" | "sub") ||
            (isConditionalGame ? "main" : undefined),
        inGameName: formData.inGameName || "",
        inGameId: formData.inGameId || "",
        boardsiderUsername: formData.boardsiderUsername || "",
        boardsiderScreenshot: formData.boardsiderScreenshot || formData.boardsiderScreenshotPreview || undefined,
    },
});

const watchHasTeam = form.watch("hasTeam");
const watchIsCaptain = form.watch("isCaptain");
const watchHas2v2Partner = form.watch("has2v2Partner");

function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedValues: Partial<RegistrationFormData> = {
        ...values,
        discordScreenshot:
            values.discordScreenshot instanceof File
                ? values.discordScreenshot
                : formData.discordScreenshot instanceof File
                ? formData.discordScreenshot
                : undefined,
        boardsiderScreenshot:
            values.boardsiderScreenshot instanceof File
                ? values.boardsiderScreenshot
                : formData.boardsiderScreenshot instanceof File
                ? formData.boardsiderScreenshot
                : undefined,
        has2v2Partner: values.has2v2Partner || "no",
    };
    updateFormData(updatedValues);
    nextStep();
}

const validateDiscordUsername = (value: string) => {
    const isValid = /^[a-z0-9_.]{2,32}$/.test(value);
    setDiscordUsernameValid(isValid);
    return isValid;
};


	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='flex items-center justify-center mb-6'>
					<GameController className='w-12 h-12 text-primary' />
				</div>

				<FormField
					control={form.control}
					name='whatsapp'
					render={({ field }) => (
						<FormItem>
							<FormLabel>WhatsApp Number</FormLabel>
							<FormControl>
								<Input {...field} placeholder='+254 XXX XXX XXX' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='discordUsername'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Discord Username (Gamer Tag)</FormLabel>
							<FormControl>
								<div className='relative'>
									<Input
										{...field}
										placeholder='username'
										onChange={(e) => {
											field.onChange(e);
											validateDiscordUsername(e.target.value);
										}}
									/>
									{discordUsernameValid !== null && (
										<div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
											{discordUsernameValid ? (
												<CheckCircle className='h-5 w-5 text-green-500' />
											) : (
												<XCircle className='h-5 w-5 text-red-500' />
											)}
										</div>
									)}
								</div>
							</FormControl>
							<FormDescription>
								Enter your Discord username without the @ symbol. It should be
								lowercase, can include numbers, dots, and underscores, and be
								between 2-32 characters.
								<br />
								Example: john.doe_123
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type='button'
					className='w-full mb-4 bg-[#5865F2] hover:bg-[#4752C4] text-white'
					onClick={() => window.open("https://discord.gg/yGHCzZax5S", "_blank")}
				>
					<svg
						className='w-6 h-6 mr-2'
						role='img'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fill='currentColor'
							d='M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z'
						/>
					</svg>
					Join Our Discord Server
				</Button>

				<div className='bg-blue-900 p-4 rounded-lg mb-4'>
					<p className='font-bold'>Important:</p>
					<p className='text-sm'>
						Please join our Discord server and take a screenshot showing your
						username before uploading. This will be used to assign your
						tournament role.
					</p>
				</div>

				<FormField
					control={form.control}
					name='discordScreenshot'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Discord Screenshot Upload</FormLabel>
							<FormControl>
								<FileUpload
									field={field}
									fieldName='discordScreenshot'
									accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
									maxSize={MAX_FILE_SIZE}
									updateFormData={updateFormData}
									preview={formData.discordScreenshotPreview}
								/>
							</FormControl>
							<FormDescription>
								Upload a screenshot showing your Discord username in our server
								(JPG/PNG, max 5MB)
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{isConditionalGame && (
					<>
						<FormField
							control={form.control}
							name='inGameName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>In-Game Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder='Enter your in-game name' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='inGameId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>In-Game ID</FormLabel>
									<FormControl>
										<Input {...field} placeholder='Enter your in-game ID' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='boardsiderUsername'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Boardsider Username</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Enter your Boardsider username'
										/>
									</FormControl>
									<FormDescription>
										Create an account on{" "}
										<a
											href='http://www.boardsider.com'
											target='_blank'
											rel='noopener noreferrer'
											className='text-primary hover:underline'
										>
											Boardsider{" "}
											<ExternalLink className='inline-block w-4 h-4' />
										</a>{" "}
										and enter your username here.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='boardsiderScreenshot'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Boardsider Screenshot Upload</FormLabel>
									<FormControl>
										<FileUpload
											field={field}
											fieldName='boardsiderScreenshot'
											accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
											maxSize={MAX_FILE_SIZE}
											updateFormData={updateFormData}
											preview={formData.boardsiderScreenshotPreview}
										/>
									</FormControl>
									<FormDescription>
										Upload a screenshot of your Boardsider profile showing your
										username (JPG/PNG, max 5MB)
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				)}

				{/* Existing team related fields render conditionally */}
				<FormField
					control={form.control}
					name='hasTeam'
					render={({ field }) => (
						<FormItem className='space-y-3'>
							<FormLabel>Do you have a team?</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className='flex flex-col space-y-1'
								>
									<FormItem className='flex items-center space-x-3 space-y-0'>
										<FormControl>
											<RadioGroupItem value='yes' />
										</FormControl>
										<FormLabel className='font-normal'>Yes</FormLabel>
									</FormItem>
									<FormItem className='flex items-center space-x-3 space-y-0'>
										<FormControl>
											<RadioGroupItem value='no' />
										</FormControl>
										<FormLabel className='font-normal'>No</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormDescription>
								If you don&apos;t have a team, we will try to link you with
								other players.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{watchHasTeam === "yes" && (
					<>
						<FormField
							control={form.control}
							name='teamName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Team Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder='Enter your team name' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='playerRole'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Are you a main player or sub?</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select your role' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='main'>Main Player</SelectItem>
											<SelectItem value='sub'>Substitute</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='isCaptain'
							render={({ field }) => (
								<FormItem className='space-y-3'>
									<FormLabel>Are you the captain of your team?</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className='flex flex-col space-y-1'
										>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='yes' />
												</FormControl>
												<FormLabel className='font-normal'>Yes</FormLabel>
											</FormItem>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='no' />
												</FormControl>
												<FormLabel className='font-normal'>No</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{watchIsCaptain === "no" && (
							<FormField
								control={form.control}
								name='teamCaptainName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Team Captain&apos;s Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter your team captain's name"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</>
				)}

				{isEAFC2v2Open && (
					<>
						<FormField
							control={form.control}
							name='has2v2Partner'
							render={({ field }) => (
								<FormItem className='space-y-3'>
									<FormLabel>Do you have a 2v2 partner?</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className='flex flex-col space-y-1'
										>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='yes' />
												</FormControl>
												<FormLabel className='font-normal'>Yes</FormLabel>
											</FormItem>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='no' />
												</FormControl>
												<FormLabel className='font-normal'>No</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormDescription>
										If you don&apost have a partner, we will try to link you
										with another person from the same university.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{watchHas2v2Partner === "yes" && (
							<>
								<FormField
									control={form.control}
									name='teamName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Team Name</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Enter your team name' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='isCaptain'
									render={({ field }) => (
										<FormItem className='space-y-3'>
											<FormLabel>Are you the captain of your team?</FormLabel>
											<FormControl>
												<RadioGroup
													onValueChange={field.onChange}
													defaultValue={field.value}
													className='flex flex-col space-y-1'
												>
													<FormItem className='flex items-center space-x-3 space-y-0'>
														<FormControl>
															<RadioGroupItem value='yes' />
														</FormControl>
														<FormLabel className='font-normal'>Yes</FormLabel>
													</FormItem>
													<FormItem className='flex items-center space-x-3 space-y-0'>
														<FormControl>
															<RadioGroupItem value='no' />
														</FormControl>
														<FormLabel className='font-normal'>No</FormLabel>
													</FormItem>
												</RadioGroup>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{watchIsCaptain === "no" && (
									<FormField
										control={form.control}
										name='teamCaptainName'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Team Captain&aposs Name</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="Enter your team captain's name"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
							</>
						)}
					</>
				)}

				{isEFootballMobile && (
					<>
						<FormField
							control={form.control}
							name='inGameName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>In-Game Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder='Enter your in-game name' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='isCaptain'
							render={({ field }) => (
								<FormItem className='space-y-3'>
									<FormLabel>
										Are you the captain for your university?
									</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className='flex flex-col space-y-1'
										>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='yes' />
												</FormControl>
												<FormLabel className='font-normal'>Yes</FormLabel>
											</FormItem>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='no' />
												</FormControl>
												<FormLabel className='font-normal'>No</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormDescription>
										If you are the captain, you will be responsible for
										registering your university s top players.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				)}

				<div className='flex justify-between'>
					<Button type='button' onClick={prevStep} variant='outline'>
						Previous
					</Button>
					<Button type='submit'>Next</Button>
				</div>
			</form>
		</Form>
	);
}
