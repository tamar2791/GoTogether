using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mock.Migrations
{
    /// <inheritdoc />
    public partial class init6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Child_Driver_DriverId",
                table: "Child");

            migrationBuilder.DropForeignKey(
                name: "FK_Child_EducationalInstitution_EduId",
                table: "Child");

            migrationBuilder.AlterColumn<int>(
                name: "EduId",
                table: "Child",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "DriverId",
                table: "Child",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Child_Driver_DriverId",
                table: "Child",
                column: "DriverId",
                principalTable: "Driver",
                principalColumn: "DriverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Child_EducationalInstitution_EduId",
                table: "Child",
                column: "EduId",
                principalTable: "EducationalInstitution",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Child_Driver_DriverId",
                table: "Child");

            migrationBuilder.DropForeignKey(
                name: "FK_Child_EducationalInstitution_EduId",
                table: "Child");

            migrationBuilder.AlterColumn<int>(
                name: "EduId",
                table: "Child",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DriverId",
                table: "Child",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Child_Driver_DriverId",
                table: "Child",
                column: "DriverId",
                principalTable: "Driver",
                principalColumn: "DriverId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Child_EducationalInstitution_EduId",
                table: "Child",
                column: "EduId",
                principalTable: "EducationalInstitution",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
