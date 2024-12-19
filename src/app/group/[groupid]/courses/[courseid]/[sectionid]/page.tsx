import { onAuthenticatedUser } from "@/actions/auth"
import { onGetGroupInfo } from "@/actions/groups"

type Props = {
  params: { sectionid: string; groupid: string }
}

const CourseModuleSection = async ({ params }: Props) => {
  const user = await onAuthenticatedUser()
  const group = await onGetGroupInfo(params.groupid)

  return (
    <CourseContentForm
      groupid={group.group?.userId!}
      sectionid={params.sectionid}
      userid={user.id!}
    />
  )
}

export default CourseModuleSection